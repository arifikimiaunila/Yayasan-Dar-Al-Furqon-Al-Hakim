import { Team } from '@/types';
import { router } from '@inertiajs/core';

export default function switchToTeam(e: React.FormEvent, team: Team) {
    e.preventDefault();
    router.put(
      route('current-team.update'),
      {
        team_id: team.id,
      },
      {
        preserveState: false,
      },
    );
  }

export default function logout(e: React.FormEvent) {
    e.preventDefault();
    router.post(route('logout'));
  }