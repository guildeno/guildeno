/** Type definition of how an award xp request should look like. */
export type AwardXp = {
    /**
     * Amount of XP to award.
     *
     * @minimum -1000
     * @maximum 1000
     */
    amount: number;
};
