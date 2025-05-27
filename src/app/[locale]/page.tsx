'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { requestService } from '@/services/api';

export default function Home() {
  const t = useTranslations('Home');

  useEffect(() => {
    (async function () {
      const dd = await requestService.get(
        'https://dog.ceo/api/breeds/image/random'
      );
      console.log(dd);
    })();
  }, []);

  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  );
}
