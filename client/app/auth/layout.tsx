export default function ({ children }: LayoutProps<"/auth">) { 
    return (
        <main className="flex items-center justify-center w-full min-h-screen">
            <div className="w-1/2 flex-col gap-2 items-center justify-center hidden lg:flex">
                <video 
                    src="/loading.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    className="w-full object-contain"
                />
                <h2 className="font-serif italic">"Not a flex; But once you join, it's hard to leave 😏"</h2>
            </div>
            <section className="w-1/2 flex flex-col items-center justify-center">
                {children}
            </section>
        </main>
    )
}