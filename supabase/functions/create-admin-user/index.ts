import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.1'

Deno.serve(async (req) => {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    const { email, password } = await req.json()

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email e senha são obrigatórios' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.log('Tentando criar usuário:', email)
    
    // Criar o usuário
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: 'admin'
      }
    })

    console.log('Resultado da criação:', { userData, userError })

    if (userError) {
      console.error('Erro ao criar usuário:', userError)
      return new Response(
        JSON.stringify({ error: userError.message }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!userData?.user?.id) {
      console.error('Usuário criado mas sem ID')
      return new Response(
        JSON.stringify({ error: 'Falha ao obter ID do usuário criado' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Adicionar role admin na tabela user_roles
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .insert({
        user_id: userData.user.id,
        role: 'admin'
      })

    if (roleError) {
      console.error('Erro ao adicionar role:', roleError)
      return new Response(
        JSON.stringify({ error: roleError.message }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.log('Usuário criado com sucesso:', userData.user.id)
    
    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Usuário admin criado com sucesso!',
        user_id: userData.user.id
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Erro:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Erro desconhecido' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
