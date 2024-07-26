import { Movie } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

import { AppError } from "../../../../errors/AppError";
import { ICreateMovieDTO } from "../../dtos/ICreateMovieDTO";

export class CreateMovieUseCase {
  async execute({ title, duration, release_date }: ICreateMovieDTO): Promise<Movie> {
    // Verificar se o Movie já existe
    const moveAlreadyExists = await prisma.movie.findUnique({
      where: {
        title,
      },
    });

    if (moveAlreadyExists) {
      throw new AppError("Movie already exists!");
    }
    // Criar o Movie
    const movie = await prisma.movie.create({
      data: {
        title,
        duration,
        release_date, 
      },
    });

    return movie;
  }
}
