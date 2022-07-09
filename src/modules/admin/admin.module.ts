import { Module, forwardRef } from '@nestjs/common';
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin,AdminSchema } from '@/schema';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
        forwardRef(() => AuthModule),
    ],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService]
})
export class AdminModule { }
