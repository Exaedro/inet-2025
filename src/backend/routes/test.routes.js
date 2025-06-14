import { Router } from 'express'
import { supabase } from '../database.js'

const testRouter = Router()

testRouter.get('/test', async (req, res) => {
    try {
        const { data: tables, error: tablesError } = await supabase
            .from('pg_tables')
            .select('tablename')
            .eq('schemaname', 'public')
            
        if (tablesError) {
            console.error('Error listing tables:', tablesError)
        }
        
        const { data: users, error: usersError } = await supabase
            .from('users')
            .select('*')
            .limit(1)
            
        const testEmail = `test${Date.now()}@example.com`
        const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert([{
                first_name: 'Test',
                last_name: 'User',
                email: testEmail,
                password: 'test123'
            }])
            .select()
            
        const { data: insertedUser, error: getError } = await supabase
            .from('users')
            .select('*')
            .eq('email', testEmail)
            .single()
            
        res.json({
            success: true,
            message: 'Test completed',
            data: {
                tables: tables?.map(t => t.tablename) || [],
                existingUser: users?.[0] || null,
                insertResult: insertError ? { error: insertError.message } : { success: true },
                insertedUser: insertedUser || null,
                insertError: insertError?.message,
                getError: getError?.message
            },
            raw: {
                tablesError: tablesError?.message,
                usersError: usersError?.message,
                insertError: insertError,
                getError: getError
            }
        })
        
    } catch (error) {
        console.error('Test error:', error)
        res.status(500).json({
            success: false,
            message: 'Test failed',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        })
    }
})

export default testRouter
