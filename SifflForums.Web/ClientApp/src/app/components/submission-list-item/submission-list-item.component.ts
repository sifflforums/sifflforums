import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Submission } from '../../models/comments';
import { SubmissionsService } from '../../services/submissions.service';

@Component({
  selector: 'app-submission-list-item',
  templateUrl: './submission-list-item.component.html',
  styleUrls: ['./submission-list-item.component.scss']
})
export class SubmissionListItemComponent implements OnInit {
  @Input() model: Submission;
  @Input() showBody: boolean = true;
  votePosition: number;
  upvotesCountOnScreen: number;
  disableSubmitButton: boolean; 

  constructor(private submissionsService: SubmissionsService) { }

  ngOnInit() {
    this.votePosition = this.model.currentUserVoteWeight;
    this.upvotesCountOnScreen = this.model.upvotes; 
  }

  upvote(): void {
    if (this.votePosition == 1) {
      this.removeVote();
      return;
    }

    this.votePosition = 1;
    this.upvotesCountOnScreen = (this.model.upvotes - this.model.currentUserVoteWeight) + this.votePosition;

    this.submissionsService.upvote(this.model.id).subscribe(
      (response) => { },
      (error) => { }
    );
  }

  downvote(): void {
    if (this.votePosition == -1) {
      this.removeVote();
      return;
    }

    this.votePosition = -1;
    this.upvotesCountOnScreen = (this.model.upvotes - this.model.currentUserVoteWeight) + this.votePosition;

    this.submissionsService.downvote(this.model.id).subscribe(
      (response) => { },
      (error) => { }
    );
  }

  removeVote(): void {
    this.votePosition = 0;
    this.upvotesCountOnScreen = (this.model.upvotes - this.model.currentUserVoteWeight) + this.votePosition;

    this.submissionsService.removevote(this.model.id).subscribe(
      (response) => { },
      (error) => { }
    );
  }
}
