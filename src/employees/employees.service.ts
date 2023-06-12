import { Injectable } from '@nestjs/common';
import { EmployeeDto } from '~/employees/dto/employee.dto';
import { EmployeesRepository } from '~/employees/employees.repository';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private employeesRepository: EmployeesRepository) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    await this.employeesRepository.createEmployee({
      fk_id_user: createEmployeeDto.idUser,
      fk_id_establishment: createEmployeeDto.idEstablishment
    });
  }

  findAll() {
    return `This action returns all employees`;
  }

  async findEmployeesByEstablishmentId(id: number) {
    const listEmployees =
      await this.employeesRepository.findEmployeesByEstablishmentId(id);

    return listEmployees.map(employee => EmployeeDto.factory(employee));
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
