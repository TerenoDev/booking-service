import dataSource from '../config/data-source';
import { CategoriesEquipment } from '../models/categories-equipment.entity';
import { Equipment } from '../models/Equipment.entity';
// import { getChannel } from '../config/rabbitmq';
// import { notifyUser } from "../socket";

class CategoriesEquipmentService {
    private categoriesEquipmentRepo = dataSource.getRepository(CategoriesEquipment);
    private equipmentRepo = dataSource.getRepository(Equipment);

    async createCategoriesEquipment(data: any) {
        console.log("test1");
        const categoriesEquipment = this.categoriesEquipmentRepo.create(categoriesEquipment);
        console.log("test3");
        console.log(data);
        const result = await this.categoriesEquipmentRepo.save(categoriesEquipment);
        console.log("test2");
        console.log(result);


        return result;
    }

    async updateCategoriesEquipment(id: number, data: any) {
        const categoriesEquipment = await this.categoriesEquipmentRepo.findOneBy({ id });
        if (!categoriesEquipment) throw new Error('Exchange not found');

        Object.assign(categoriesEquipment, data);
        return this.categoriesEquipmentRepo.save(categoriesEquipment);
    }

    async deleteCategoriesEquipment(id: number) {
        const categoriesEquipment = await this.categoriesEquipmentRepo.findOneBy({ id });
        if (!categoriesEquipment) throw new Error('CategoriesEquipment not found');

        return this.categoriesEquipmentRepo.remove(categoriesEquipment);
    }

    async getCategoriesEquipment(id: number) {
        return this.categoriesEquipmentRepo.findOneBy({ id });
    }

    async listCategoriesEquipment(filters: any) {
        const findOptions: any = {};
        if (filters.status) findOptions.status = filters.status;
        if (filters.initiatorId) findOptions.initiatorId = Number(filters.initiatorId);

        return this.categoriesEquipmentRepo.find({ where: findOptions });
    }

    // async notifyGameUnavailable(playerGameId: number) {
    //     const equipment = await this.equipmentRepo.findOneBy({ id: playerGameId });
    //
    //     if (!equipment) {
    //         console.error(`PlayerGame with ID ${playerGameId} not found`);
    //         return null;
    //     }
    //     notifyUser(playerGame.userId, 'exchange_created', {
    //         message: 'Вам поступила заявка на обмен',
    //         exchange: "Pending",
    //     });
    //
    //     const gameId = playerGame.gameId;
    //
    //     getChannel().sendToQueue(
    //         'game_commands',
    //         Buffer.from(JSON.stringify({
    //             type: 'MARK_UNAVAILABLE',
    //             data: { gameId },
    //             date: new Date()
    //         }))
    //     );
    //
    //     return gameId;
    // }


//     async markGamesInExchange(gameIds: string[]) {
//         await this.playerGameRepo.update(gameIds, { status: 'IN_EXCHANGE' });
//     }
//     async checkGameAvailability(gameId: number): Promise<boolean> {
//         const gamePlayer = await this.playerGameRepo.findOne({
//             where: {
//                 id: gameId
//             }
//         });
//         return !!gamePlayer;
//     }
//
//
//     async unlockGames(gameIds: string[]) {
//         await this.playerGameRepo.update(gameIds, { status: 'AVAILABLE' });
//     }
}

export default new CategoriesEquipmentService();