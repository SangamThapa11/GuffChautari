const HorizontalDivider = ({dividerText='OR'}: Readonly<{dividerText?: string}>) => {
    return (<>
        <span className="flex items-center">
            <span className="h-px flex-1 bg-black"></span>
            {
               dividerText ? <span className="shrink-0 px-4 text-black font-bold font-sans"> {dividerText} </span> : <></>
            }
            <span className="h-px flex-1 bg-black"></span>
        </span>
    </>)
}

export default HorizontalDivider;