import { useSelector } from "react-redux";

export const useRole = () => {
    const { user } = useSelector((state) => state.user);

    return {
        isManager: user?.is_staff,
        isAdmin: user?.is_superuser,
        isStaff: user?.is_staff || user?.is_superuser
    };
};
