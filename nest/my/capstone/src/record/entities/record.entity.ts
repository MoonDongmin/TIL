import {
    Column,
    Entity,
    PrimaryColumn,
} from "typeorm";

@Entity()
export class Record {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    time: string;

    @Column()
    createdAt: string;

    @Column()
    content: string;
}