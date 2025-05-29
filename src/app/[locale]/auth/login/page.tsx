'use client';

import { Form } from '@/components/form';
import Input from '@/components/input';
import { Button } from '@/components/button';
import { useLoginSchema } from '@/hooks/yup/useLoginSchema';
import { useTranslations } from 'next-intl';
import { useStore } from '@/providers/storeProvider';

const Login = () => {
  const { loginSchema } = useLoginSchema();
  const t = useTranslations('auth');

  const auth = useStore(state => state);
  console.log('auth', auth);
  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
            {t('signinIntoAccount')}
          </h2>
          <p>{auth.isAuth ? 'Logged in' : 'Logged out'}</p>
        </div>

        <div className='mt-12 sm:mx-auto sm:w-full sm:max-w-sm'>
          <Form
            onSubmit={async data => {
              auth.setIsAuth(false);
              console.log(data);
            }}
            validationSchema={loginSchema}
            defaultValues={{ email: '', password: '' }}
          >
            {({ register, formState }) => (
              <>
                <Input
                  {...register('email')}
                  placeholder={t('email')}
                  errorMsg={formState.errors.email?.message}
                />
                <Input
                  {...register('password')}
                  placeholder={t('password')}
                  errorMsg={formState.errors.password?.message}
                />
                <Button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  {t('signin')}
                </Button>
              </>
            )}
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
