'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
  is_admin: boolean;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrCreateProfile = async (authUser: User) => {
    try {
      // Tentar buscar perfil existente
      const { data: existingProfile, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (existingProfile) {
        // Perfil existe, mapear dados
        setProfile({
          id: existingProfile.id,
          email: existingProfile.email,
          full_name: existingProfile.nome || existingProfile.full_name || authUser.email?.split('@')[0] || 'Usuário',
          avatar_url: existingProfile.avatar_url,
          created_at: existingProfile.created_at,
          is_admin: existingProfile.is_admin || false,
          role: existingProfile.role || 'user',
        });
        return;
      }

      // Se não existe, criar novo perfil
      if (fetchError && fetchError.code === 'PGRST116') {
        const { data: newProfile, error: insertError } = await supabase
          .from('users')
          .insert({
            id: authUser.id,
            email: authUser.email,
            full_name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Usuário',
            created_at: new Date().toISOString(),
            is_admin: false,
            role: 'user',
          })
          .select()
          .single();

        if (insertError) {
          console.error('Erro ao criar perfil:', insertError);
          // Mesmo com erro, criar perfil local temporário
          setProfile({
            id: authUser.id,
            email: authUser.email || '',
            full_name: authUser.email?.split('@')[0] || 'Usuário',
            avatar_url: undefined,
            created_at: new Date().toISOString(),
            is_admin: false,
            role: 'user',
          });
        } else if (newProfile) {
          setProfile({
            id: newProfile.id,
            email: newProfile.email,
            full_name: newProfile.nome || newProfile.full_name || 'Usuário',
            avatar_url: newProfile.avatar_url,
            created_at: newProfile.created_at,
            is_admin: newProfile.is_admin || false,
            role: newProfile.role || 'user',
          });
        }
      } else {
        console.error('Erro ao buscar perfil:', fetchError);
      }
    } catch (error) {
      console.error('Erro no fetchOrCreateProfile:', error);
    }
  };

  useEffect(() => {
    // Buscar usuário autenticado
    const getUser = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        setUser(authUser);

        if (authUser) {
          await fetchOrCreateProfile(authUser);
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchOrCreateProfile(session.user);
      } else {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, profile, loading };
}
