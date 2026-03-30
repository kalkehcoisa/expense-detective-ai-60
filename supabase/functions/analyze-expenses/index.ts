import "https://deno.land/std@0.168.0/dotenv/load.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { expenses } = await req.json();

    if (!expenses || !Array.isArray(expenses)) {
      return new Response(
        JSON.stringify({ error: 'Lista de gastos inválida.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY');
    if (!GROQ_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Chave da API Groq não configurada.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const expensesText = expenses
      .map((e: { description: string; amount: number; category: string; date: string }) =>
        `- ${e.date} | ${e.category} | ${e.description} | R$${e.amount.toFixed(2)}`
      )
      .join('\n');

    const prompt = `Você é um analista financeiro pessoal.

Analise os dados de gastos abaixo e gere insights claros, diretos e úteis.

Dados:
${expensesText}

Regras:
- Use linguagem simples
- Seja direto
- Identifique padrões
- Aponte problemas
- Sugira melhorias práticas

Formato da resposta:
1. Principais padrões identificados
2. Problemas encontrados
3. Recomendações práticas
4. Insight final resumido (1 frase forte)

Evite respostas genéricas.
Seja específico com base nos dados.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: 'Você é um analista financeiro pessoal brasileiro especializado em finanças pessoais.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Erro ao analisar seus dados. Tente novamente.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content || 'Não foi possível gerar a análise.';

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: 'Erro ao analisar seus dados. Tente novamente.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
