import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { ICreateUserDTO } from "../../dtos/CreateUserDTO";
import { AppError } from "../../../../errors/AppError";

export class CreateUserUseCase {
  async execute({ name, email }: ICreateUserDTO): Promise<User> {
    // Verificar se usuário já existe
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    // Criar o usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        updated_at: new Date(), 
      },
    });

    return user;
  }
}
