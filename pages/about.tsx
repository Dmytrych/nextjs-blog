import React from 'react';
import Layout from '../components/Layout';
import Link from "next/link";

export const About = (): JSX.Element => {
    return (
        <Layout
            customMeta={{
                title: 'About - Хабазня Дмитро',
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

export default About;
