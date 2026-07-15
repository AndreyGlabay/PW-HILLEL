export function generateWrongEmailFormat() {
    return `test-email${Date.now()}`;
}

export function generateRandomEmail() {
    return `test-${Date.now()}@gmail.com`;
}

export function generateRandomPassword(length: number = 10) {
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';

    const fullPassword = upperCaseLetters + lowerCaseLetters + numbers;

    if (length < 3) {
        throw new Error('Password length must be at least 3');
    }

    let password =
        randomString(upperCaseLetters, 1) +
        randomString(lowerCaseLetters, 1) +
        randomString(numbers, 1);

    password += randomString(fullPassword, length - 3);

    return password;
}


// ---------------- ALPHA CHARACTERS STRING GENERATORS ---------------- //

export function randomString(chars: string, length: number): string {
    return Array.from(
        { length },
        () => chars[Math.floor(Math.random() * chars.length)]
    ).join('');
}

export const randomEnMixed = (length: number) =>
    randomString('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', length);

export const randomUaMixed = (length: number) =>
    randomString('АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгґдеєжзиіїйклмнопрстуфхцчшщьюя', length);












