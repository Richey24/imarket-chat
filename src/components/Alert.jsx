
function Alert({children}) {
    return (
        <>
            <div class="alert alert-arrow-right alert-icon-right alert-light-primary mb-4"
                role="alert">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 21H23L12 2L1 21Z" fill="#FFC107"/>
                        <path d="M13 16H11V18H13V16ZM13 10H11V14H13V10Z" fill="black"/>
                    </svg>

                    <strong></strong>{children}
                </div> 
        </>
    )
}

export default Alert;
