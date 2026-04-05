export const maskEmail = (email) => {
    if (!email.includes("@")) return email;

    const [user, domain] = email.split("@");
    const maskedUser =
        user[0] +
        "*".repeat(Math.max(0, user.length - 2)) +
        user[user.length - 1];
    const [dName, dExt] = domain.split(".");
    return (
        maskedUser +
        "@" +
        dName[0] +
        "*".repeat(Math.max(0, dName.length - 1)) +
        "." +
        dExt
    );
};