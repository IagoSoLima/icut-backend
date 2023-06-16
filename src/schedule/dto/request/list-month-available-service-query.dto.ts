import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ListMonthAvailableServiceQueryDTO {
  @ApiPropertyOptional({
    name: 'Mês para consultar dias disponíveis',
    example: 10,
    description: 'NÚMERO DO MÊS'
  })
  @Type(() => Number)
  @IsOptional()
  month: number;
  @ApiPropertyOptional({
    name: 'Ano para consultar dias disponíveis',
    example: 2023,
    description: 'NÚMERO DO ANO'
  })
  @Type(() => Number)
  @IsOptional()
  year: number;
}
