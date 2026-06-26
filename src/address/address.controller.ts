import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createAddressDto: CreateAddressDto, @Req() req: any) {
    const userId = (req as any).user.id; 
    return this.addressService.create(createAddressDto, userId);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  findMyAddresses(@Req() req: any) {
    const userId = (req as any).user.id;
    return this.addressService.findMyAddresses(userId);
  }
}
