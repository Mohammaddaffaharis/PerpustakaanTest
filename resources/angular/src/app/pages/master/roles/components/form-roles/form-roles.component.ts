import { Component, Input, OnInit, Output, SimpleChange, EventEmitter } from '@angular/core';

import { LandaService } from 'src/app/core/services/landa.service';
import { RoleService } from '../../../roles/services/role-service.service';

@Component({
    selector: 'role-form',
    templateUrl: './form-roles.component.html',
    styleUrls: ['./form-roles.component.scss']
})
export class FormRolesComponent implements OnInit {
    @Input() roleId: number;
    @Output() afterSave = new EventEmitter<boolean>();
    mode: string;
    listAkses: [];
    formModel: {
        id: number,
        nama: string,
        isAdmin: string,
        akses: {
            user: {
                create: boolean,
                update: boolean,
                delete: boolean,
                view: boolean,
            },
            profile: {
                create: boolean,
                update: boolean,
                delete: boolean,
                view: boolean,
            },
            roles: {
                create: boolean,
                update: boolean,
                delete: boolean,
                view: boolean,
            },
            buku: {
                create: boolean,
                update: boolean,
                delete: boolean,
                view: boolean,
            },
            peminjaman: {
                create: boolean,
                update: boolean,
                delete: boolean,
                view: boolean,
            },
            laporanBuku: {
                create: boolean,
                update: boolean,
                delete: boolean,
                view: boolean,
            },
            laporanUser: {
                create: boolean,
                update: boolean,
                delete: boolean,
                view: boolean,
            },
        },
    }

    constructor(
        private roleService: RoleService,
        private landaService: LandaService
    ) { }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChange) {
        this.emptyForm();
    }

    emptyForm() {
        this.mode = 'add';
        this.formModel = {
            id: 0,
            nama: '',
            isAdmin: '0',
            akses: {
                user: {
                    create: false,
                    update: false,
                    delete: false,
                    view: false,
                },
                profile: {
                    create: false,
                    update: false,
                    delete: false,
                    view: false,
                },
                roles: {
                    create: false,
                    update: false,
                    delete: false,
                    view: false,
                },
                buku: {
                    create: false,
                    update: false,
                    delete: false,
                    view: false,
                },
                peminjaman: {
                    create: false,
                    update: false,
                    delete: false,
                    view: false,
                },
                laporanBuku: {
                    create: false,
                    update: false,
                    delete: false,
                    view: false,
                },
                laporanUser: {
                    create: false,
                    update: false,
                    delete: false,
                    view: false,
                }
            },
        }

        if (this.roleId > 0) {
            this.mode = 'edit';
            this.getRole(this.roleId);
        }
    }

    getRole(roleId) {
        this.roleService.getRoleById(roleId).subscribe((res: any) => {
            this.formModel.id = res.data.id;
            console.log(res.data);
            
            this.formModel.nama = res.data.nama;
            this.formModel.isAdmin = res.data.isAdmin;
            
            // Detail hak akses
            const akses = res.data.akses;
            for (const key in akses) {
                this.formModel.akses[key] = akses[key];
            }
            console.log(this.formModel);
        }, err => {
            console.log(err);
        });
    }

    save() {
        if (this.mode == 'add') {
            this.roleService.createRole(this.formModel).subscribe((res: any) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                this.afterSave.emit();
            }, err => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);
            });
        } else {
            this.roleService.updateRole(this.formModel).subscribe((res: any) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                this.afterSave.emit();
            }, err => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);
            });
        }
    }
}
