import * as yup from 'yup';

import { useTranslations } from 'next-intl';

export const useLoginSchema = () => {
  const t = useTranslations('errors');

  const loginSchema = yup
    .object({
      email: yup.string().email(t('invalidEmail')).required(t('requiredEmail')),
      password: yup.string().required(t('requiredPassword')),
    })
    .required();

  return { loginSchema };
};
