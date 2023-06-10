import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ListDayAvailableServiceQueryDTO {
  @ApiPropertyOptional({
    name: 'Dia para consultar horáios disponíveis',
    example: 10,
    description: 'NÚMERO DO DIA'
  })
  @Type(() => Number)
  @IsOptional()
  day: number;

  @ApiPropertyOptional({
    name: 'Mês para consultar horários disponíveis',
    example: 10,
    description: 'NÚMERO DO MÊS'
  })
  @Type(() => Number)
  @IsOptional()
  month: number;

  @ApiPropertyOptional({
    name: 'Ano para consultar horários disponíveis',
    example: 2023,
    description: 'NÚMERO DO ANO'
  })
  @Type(() => Number)
  @IsOptional()
  year: number;
}
