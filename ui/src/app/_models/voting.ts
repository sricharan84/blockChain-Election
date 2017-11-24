export class Voting {
      citizenId: string;
	candidateId: string;
	electionId: string;
	constituencyId: string;

	    constructor (citizenId: string, candidateId: string, electionId: string, constituencyId: string) {
		this.constituencyId = constituencyId;
		this.candidateId = candidateId;
		this.electionId = electionId;
		this.citizenId = citizenId;
	}

}

