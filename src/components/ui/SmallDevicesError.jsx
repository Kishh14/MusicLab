import { useEffect, useState } from "react";

const SmallDevicesError = () => {
    const [windowWidth, setWindowWidth] = useState();

    useEffect(() => {
        const screen = window.innerWidth;
        setWindowWidth(screen);
      
        // Event listener for resize
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
      
        // Cleanup function to remove event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
      }, [window.innerWidth]);      

    return (
        <>
            {windowWidth < 1024 ?
                <section className="flex items-center h-screen">
                    <h1 className="w-screen shadow-lg p-8 bg-red-800 text-center" style={{ fontSize: '18px' }}>Please use desktop to access the musical dashboard ⚠️</h1>
                </section>
                : null
            }
        </>
    )
}

export default SmallDevicesError;