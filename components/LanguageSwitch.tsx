import React from 'react';
import {useRouter} from "next/router";
import Link from "next/link";

const LanguageSwitch = (): JSX.Element => {
  const { locale, locales, asPath } = useRouter();

  return (
    <div className="flex items-center w-10">
      <Link aria-label="Change UI Language" href={asPath} passHref locale={locales.find((localeOption) => localeOption != locale)}>
        {locale === 'uk' ? "EN" : "UA"}
      </Link>
    </div>
  );
};

export default LanguageSwitch;
