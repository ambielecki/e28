<!DOCTYPE html>
<html lang='en'>
<head>
    <title>E28 P1</title>
    <meta charset='utf-8'>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" defer></script>
    <script src="blackjack.js" defer></script>
    <link rel="stylesheet" href="blackjack.css">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
    <div class="content">
        <section class="hero is-dark">
            <div class="container">
                <h1 class="title">
                    Simple Blackjack
                </h1>
                <h2 class="subtitle">
                    Written With Vue.js
                </h2>
            </div>
        </section>

        <section class="columns" id="blackjack" v-cloak>
            <div class="column is-one-quarter">
                <div class="card">
                    <header class="card-header">
                        <div class="columns is-multiline">
                            <div class="column is-full">
                                <p class="card-header-title">
                                    Game Status
                                </p>
                            </div>

                            <div v-show="message" class="column is-full">
                                <blackjack-message
                                  :message="message"
                                  :message_class="message_class"
                                ></blackjack-message>
                            </div>
                        </div>
                    </header>
                    
                    <div class="card-content">
                        <div class="columns is-mobile is-multiline">
                            <div class="column is full">
                                <div class="columns is-mobile is-multiline">
                                    <div class="column is-half">
                                        Player total: {{ player_score_view }}
                                    </div>

                                    <div class="column is-half">
                                        Dealer total: {{ dealer_score_view }}
                                    </div>
                                </div>
                            </div>

                            <div class="column is-full">
                                <div v-show="game_over" class="columns is-mobile is-multiline">
                                    <div class="column is-full">
                                        Bet: {{ initial_bet }}
                                    </div>

                                    <div class="column is-one-third">
                                        <button class="button is-dark" @click="startGame">Deal</button>
                                    </div>

                                    <div class="column is-one-third">
                                        <button class="button is-success" @click="increaseBet">Bet +</button>
                                    </div>

                                    <div class="column is-one-third">
                                        <button class="button is-danger" @click="decreaseBet">Bet -</button>
                                    </div>
                                </div>

                                <div v-show="!game_over" class="columns is-mobile is-multiline">
                                    <div class="column is-full">
                                        Bet: {{ current_bet }}
                                    </div>

                                    <div class="column is-one-third">
                                        <button class="button is-success" @click="hitMe">Hit Me!</button>
                                    </div>

                                    <div class="column is-one-third">
                                        <button class="button is-danger" @click="stay">Stay</button>
                                    </div>

                                    <div v-if="allowed_to_double" class="column is-one-third">
                                        <button class="button is-warning" @click="doubleDown">Double</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="column is-half">
                <div class="card">
                    <div class="card-content columns is-multiline has-background-success" id="card_table">
                        <playing-area
                          owner="Dealer"
                          :owner_score="dealer_score_view"
                          :cards="dealer_hand"
                        ></playing-area>
                        <playing-area
                          owner="Player"
                          :owner_score="player_score_view"
                          :cards="player_hand">
                        </playing-area>
                    </div>
                </div>
            </div>

            <div class="column is-one-quarter">
                <div class="columns is-multiline">
                    <div class="column is-full">
                        <div class="card">
                            <header class="card-header">
                                <p class="card-header-title">
                                    Scoreboard
                                </p>
                            </header>

                            <div class="card-content">
                                <div class="columns is-multiline">
                                    <div class="column is-full">
                                        <div class="columns is-mobile is-multiline">
                                            <div class="column is-half">
                                                Player Purse: {{ player_purse}}
                                            </div>

                                            <div class="column is-half">
                                                Games Played: {{ scoreboard_total }}
                                            </div>

                                            <div class="column is-one-third">
                                                Wins: {{ scoreboard.wins }}
                                            </div>

                                            <div class="column is-one-third">
                                                Losses: {{ scoreboard.losses }}
                                            </div>

                                            <div class="column is-one-third">
                                                Draws: {{ scoreboard.draws }}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="column is-full">
                                        <div class="columns">
                                            <div class="column is-one-third">
                                                <button class="button is-danger" @click="resetStats">Reset</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="results.length > 0" class="column is-full">
                        <result-list title="Results">
                            <template #results>
                                <result-content :results="results"></result-content>
                            </template>
                            <template #toggle>
                                <toggle-button
                                  @toggle="show_audit = true"
                                  text="Show Audit"
                                  :display="!show_audit"
                                ></toggle-button>
                            </template>
                        </result-list>
                    </div>

                    <!-- Intentionally an if, no need to render as most will not touch this -->
                    <div v-if="show_audit" class="column is-full">
                        <result-list title="Audit">
                            <template #results>
                                <audit-content :audit="audit"></audit-content>
                            </template>
                            <template #toggle>
                                <toggle-button
                                  @toggle="show_audit = false"
                                  text="Hide Audit"
                                ></toggle-button>
                            </template>
                        </result-list>
                    </div>

                    <div class="column is-full">
                        <div class="card">
                            <header class="card-header">
                                <p class="card-header-title">House Rules</p>
                            </header>

                            <div class="card-content">
                                <ul>
                                    <li>6 decks in play</li>
                                    <li>Deck is shuffled if half finished at start of game</li>
                                    <li>No Splitting (sorry too complicated to code right now)</li>
                                    <li>Dealer hits on soft 17</li>
                                    <li>Blackjack beats 21</li>
                                    <li>Blackjack pays 3:2</li>
                                    <li>Bet may be changed before starting new game</li>
                                    <li>Note: Bet is removed from purse when hand is dealt, it is returned if you win</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <footer class="footer has-text-centered">
        <div class="content">
            <p>&copy;2020 Andrew Bielecki</p>
            <p>
                <a href="https://github.com/ambielecki/e28/tree/master/p1"><i class="fab fa-github"></i> View Source On Github</a>
            </p>
        </div>
    </footer>
    <?php
        // reusable templates without a JS build step :)
        foreach (glob('./templates/*.php') as $file) {
            include $file;
        }
    ?>
</body>