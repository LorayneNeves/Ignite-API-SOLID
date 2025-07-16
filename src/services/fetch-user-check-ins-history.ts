import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";


interface FetchUserCheckInsHistoryServiceRequest{
    userId: string
    page: number
}

interface FetchUserCheckInsHistoryServiceResponse{
    checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryService {
    constructor(private CheckInsHSRepository: CheckInsRepository) {}

    async execute({
        userId,
        page
    }: FetchUserCheckInsHistoryServiceRequest): Promise<FetchUserCheckInsHistoryServiceResponse> {
        const checkIns = await this.CheckInsHSRepository.findManyByUserId(userId, page)

        return{
            checkIns,
        }

    }
}
