import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";
import { AsyncPipe, NgIf } from "@angular/common";
import { mockUser } from "../../../../shared/mock-user";

@Component({
  selector: "app-profile-page",
  template: `
    <div *ngIf="isValidUser; else wrongUserTemplate">
      <h1>{{ profile.username }}'s Profile</h1>
      <p>{{ profile.bio }}</p>
      <img [src]="profile.image" alt="Profile Picture" />
      <router-outlet></router-outlet>
    </div>
    <ng-template #wrongUserTemplate>
      <h1>Wrong user</h1>
    </ng-template>
  `,
  imports: [
    NgIf,
    RouterLink,
    AsyncPipe,
    RouterLinkActive,
    RouterOutlet,
  ],
  standalone: true,
})
export class ProfileComponent implements OnInit {
  profile = mockUser; 
  isValidUser: boolean = false; 
  destroyRef = inject(DestroyRef);

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  ngOnInit() {
    const username = this.route.snapshot.params["username"]; // Get :username from route
    this.isValidUser = username === mockUser.username; // Validate against mockUser
    if (this.isValidUser) {
      this.profile = mockUser; // Set profile to mockUser if valid
    }
  }
}
