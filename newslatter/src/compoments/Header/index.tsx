
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';

export function Header() {

    const { asPath } = useRouter()
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image width={176}  height={176} src="/images/logo.svg" alt="newslatter" />
                <nav>
                    <ActiveLink activeClassName={styles.active} href='/'>
                        <a>Home</a>
                    </ActiveLink>

                    <ActiveLink activeClassName={styles.active} href='/posts'>
                        <a>Posts</a>
                    </ActiveLink>
                </nav>

                <SignInButton></SignInButton>
            </div>
        </header >
    );
}