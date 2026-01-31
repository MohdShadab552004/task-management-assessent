import { Button } from "../ui/button";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

export function Navbar() {
    const { user, logout } = useAuth();
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

    const handleLogoutClick = () => {
        setIsLogoutDialogOpen(true);
    };

    const confirmLogout = async () => {
        await logout();
        setIsLogoutDialogOpen(false);
    };

    return (
        <>
            <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Task Manager</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium hidden sm:inline-block">
                            Welcome, {user?.name}
                        </span>
                        <Button variant="ghost" size="sm" onClick={handleLogoutClick}>
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Logout</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to log out of your account?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsLogoutDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={confirmLogout}>
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
