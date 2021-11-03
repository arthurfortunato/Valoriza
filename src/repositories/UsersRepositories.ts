import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

@EntityRepository()
export class UsersRepositories extends Repository<User> { }