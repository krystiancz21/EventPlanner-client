'use client'

import Link from "next/link";

export default function Navbar() {

    return (
        <>
            <div className="flex flex-row pt-2 max-md:px-2 max-md:hidden">
                <div className="flex flex-row items-center justify-center gap-6">
                    <Link href="/">
                        <div className="flex flex-row items-center gap-1">
                            <span>Home</span>
                        </div>
                    </Link>

                    <Link href="/workshops">
                        <div className="flex flex-row items-center gap-1">
                            <span>workshops</span>
                        </div>
                    </Link>

                    <Link href="/reservations">
                        <div className="flex flex-row items-center gap-1">
                            <span>reservations</span>
                        </div>
                    </Link>
                    <Link href="/login">
                        <div className="flex flex-row items-center gap-1">
                            <span>Login</span>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}