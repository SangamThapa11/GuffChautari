import type React from "react";

export const PageSection = () => {
    let description = `Hungry? Don’t wait! 😋
                    Order your favorite dishes online and enjoy delicious food delivered hot and fresh to you!`
    return(
        <p> {description}.</p>

    );
}
export interface IPageTitleProps {
    title: string;
    className?: string,
    children?: React.ReactNode 
}

export const PageTitle= ({title, className='', children}: Readonly<IPageTitleProps>) => {
    return(
         <h1 className={`text-4xl font-semibold ${className} shadow text-shadow-lg/55`}>
            {
            children ? children : title
            }
            </h1>
    );
}