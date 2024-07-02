import React from 'react'

function Home(props) {
    const { setSignMode, UserAuth } = props
    // console.log(UserAuth);
    return (
        <>
            <h1>Home</h1>
            <h3>Email : <span className='text-primary'>{UserAuth.email} </span></h3>
            <h3>Frit Name : <span className='text-primary'>{UserAuth.firstName} </span> </h3 >
            <h3>Sure Name : <span className='text-primary'>{UserAuth.lastName}  </span></h3 >
            <h3>phone : <span className='text-primary'>{UserAuth.phone}  </span></h3 >

            <p className='text-normal'>Back to <a href="#" onClick={() => setSignMode('SignIn')}>Sign In!</a></p>
        </>
    )
}

export default Home