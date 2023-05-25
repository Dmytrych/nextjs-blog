import React from 'react';
import Layout from '../components/Layout';
import Link from "next/link";
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

export const Contacts = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Layout
            customMeta={{
                title: `${t('common:contacts')} - Хабазня Дмитро`,
            }}
        >
            <h1>Контакти</h1>
            <div className="flex-col">
                <div><Link href="https://github.com/Dmytrych">GitHub</Link></div>
                <div><Link href="https://www.linkedin.com/in/dmytro-habaznia-9a251419a/">LinkedIn</Link></div>
                <div>karambolrul@gmail.com</div>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: { ...(await serverSideTranslations(locale, ['common'])) },
    };
};

export default Contacts;
