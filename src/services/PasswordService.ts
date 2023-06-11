import * as bcrypt from 'bcrypt';

class PasswordService {
    async hashPassword(password: string): Promise<any> {
        return await bcrypt.hash(password, 10);
    }

    async checkPassword(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }
}

export default PasswordService;
