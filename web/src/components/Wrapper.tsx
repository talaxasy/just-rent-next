import {Box, Breadcrumb, Link} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

type WrapperVariant = 'infinite' | 'small' | 'large' | 'average';

interface WrapperProps {
	variant?: WrapperVariant;
	type?: 'profile';
}

const Wrapper: React.FC<WrapperProps> = ({children, variant = 'large', type}) => {
	let mx: undefined | string = '';
	switch (variant) {
		case 'infinite':
			mx = undefined;
			break;
		case 'small':
			mx = '400px';
			break;
		case 'large':
			mx = '1300px';
			break;
		case 'average':
			mx = '800px';
			break;
		default:
			break;
	}
	const convertBreadcrumb = (string = '') => {
		return string
			.replace(/-/g, ' ')
			.replace(/oe/g, 'ö')
			.replace(/ae/g, 'ä')
			.replace(/ue/g, 'ü')
			.toUpperCase();
	};

	const router = useRouter();
	const [breadcrumbs, setBreadcrumbs] = useState<any[]>([]);

	useEffect(() => {
		if (router) {
			const linkPath: string[] = router.asPath.split('/');
			linkPath.shift();

			const pathArray: any = linkPath.map((path, i) => {
				return {breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/')};
			});

			setBreadcrumbs(pathArray);
		}
	}, [router]);

	return (
		<Box mx="auto" maxW={mx} w="100%" px={variant !== 'infinite' ? 4 : undefined}>
			{type === 'profile' && (
				<nav aria-label="breadcrumbs">
					<ol className="breadcrumb">
						<li>
							<a href="/">Главная</a>
						</li>
						{breadcrumbs.length &&
							breadcrumbs.map(breadcrumb => {
								return (
									<li key={breadcrumb.href}>
										<Link href={breadcrumb.href}>
											<a>{convertBreadcrumb(breadcrumb.breadcrumb)}</a>
										</Link>
									</li>
								);
							})}
					</ol>
				</nav>
			)}
			{children}
		</Box>
	);
};

export default Wrapper;
