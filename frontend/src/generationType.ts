
export type StyleOption = "Editorial" | "Streetwear" | "Vintage";

export interface GenerateRequest {
    image: File | null;
    prompt: string;
    style: string;
}

export interface GeneratedResponse {
    id: string
    userId: string;
    imageUrl: string;
    prompt: string;
    style: string;
    createdAt: string;
    generationStatus: string;
}