import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/Feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private readonly feedbackRepository: FeedbacksRepository,
    private readonly mailAdapter: MailAdapter,
  ) { }
  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error('Type is requried,');
    }

    if (!comment) {
      throw new Error('Comment is requried,');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.');
    }

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: $111;">`,
        `<p>Tipo do ffedback: ${type}</p>`,
        `<p>Tipo do ffedback: ${comment}</p>`,
        `</div>`,
      ].join('\n'),
    });
  }
}
