/* External dependencies */
import { compare, hash } from 'bcrypt';
import Jwt from 'jsonwebtoken';

/* Internal dependencies */
import DB from '../DB/config';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dtos/users.dto';
import { HttpException } from '../exceptions/HttpException';
import { SECRET_KEY } from '../common';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { isEmpty } from '../utils/checkEmpty';

export default class AuthService {
  public users = DB.Users;

  public async signup(userData: CreateUserDto): Promise<User> {
    const isUserExist: User = await this.users.findOne({ where: { email: userData.email } });

    if (isUserExist) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async signin(userData: CreateUserDto): Promise<{ token: string; findUser: User }> {
    const findUser: User = await this.users.findOne({ where: { email: userData.email } });

    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);

    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const token = Jwt.sign({ email: findUser.email }, SECRET_KEY, { expiresIn: '10m' });

    return { token, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, "You're not a user");

    return findUser;
  }

  public async getCurrentUser(userData: User): Promise<User> {
    const currenUser = await this.users.findOne({ where: { email: userData.email } });

    if (!currenUser) throw new HttpException(400, 'There is not such user');

    return currenUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const expiresIn: number = 10 * 60;

    return { expiresIn, token: Jwt.sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}
