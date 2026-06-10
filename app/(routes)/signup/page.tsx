'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GalleryVerticalEnd } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AxiosInterceptor } from '@/app/shared/core/http';
import { useLocalStorage } from '@/app/shared/hooks/useLocalStorage';
import { useUserStore } from '@/app/shared/core/providers/userProvider';
import { toast } from 'sonner';

export default function SignUpPage() {
  const [, setValue] = useLocalStorage('token', '');
  const { setUser } = useUserStore(state => state);
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!login || !email || !phone || !password) {
      toast.error('Заполните все поля');
      return;
    }
    setLoading(true);
    try {
      const data = await AxiosInterceptor.$post('/user/signup', {
        login,
        email,
        phone,
        password,
      });
      if (data?.status === 200) {
        setValue(data.body.token);
        setUser(1, data.body.user.login);
        router.push('/');
      } else {
        toast.error(data?.message || 'Ошибка регистрации');
      }
    } catch {
      toast.error('Ошибка соединения');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 self-center font-semibold">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="h-4 w-4" />
          </div>
          E-Shop
        </div>

        {/* Card */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Создать аккаунт</h1>
            <p className="text-sm text-muted-foreground">
              Уже есть аккаунт?{' '}
              <Link href="/signin" className="underline underline-offset-4">
                Войти
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="login">Логин</Label>
              <Input
                id="login"
                type="text"
                placeholder="your_login"
                value={login}
                onChange={e => setLogin(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (999) 000-00-00"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSignUp()}
              />
            </div>

            <Button className="w-full" onClick={handleSignUp} disabled={loading}>
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Нажимая кнопку, вы соглашаетесь с{' '}
            <Link href="#" className="underline underline-offset-4">
              условиями использования
            </Link>{' '}
            и{' '}
            <Link href="#" className="underline underline-offset-4">
              политикой конфиденциальности
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
