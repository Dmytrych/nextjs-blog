import Link from 'next/link';
import React from 'react';
import {useTranslation} from "next-i18next";

const Navigation = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <nav>
      <Link href="/">
        <a className="text-gray-900 dark:text-white pr-6 py-4">{t('common:home')}</a>
      </Link>
      <Link href="/contacts">
        <a className="text-gray-900 dark:text-white px-6 py-4">{t('common:contacts')}</a>
      </Link>
    </nav>
  );
};

export default Navigation;
