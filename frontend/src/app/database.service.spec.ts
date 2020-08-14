import { TestBed } from "@angular/core/testing";

import { DatabaseService } from "./database.service";
import { Player } from "toxicgeartracker-shared";

describe("DatabaseService", () => {
  let service: DatabaseService;
  let store: { [key: string]: string } = {};
  const mockLocalStorage = {
    getItem: (key: string): string | null => (key in store ? store[key] : null),
    setItem: (key: string, value: string): string => (store[key] = value),
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseService);

    spyOn(localStorage, "getItem").and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, "setItem").and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, "removeItem").and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, "clear").and.callFake(mockLocalStorage.clear);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("getPlayers", () => {
    it("should call localStorage to get the players", () => {
      // Arrange, Act
      const result = service.getPlayers();

      // Assert
      expect(result).toBeTruthy();
      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem).toHaveBeenCalledWith("players");
    });
  });

  describe("isPlayersMap", () => {
    it("should return false for a non-map", () => {
      // Arrange
      const invalidMap = {};

      // Act
      const result = DatabaseService.isPlayersMap(invalidMap);

      // Assert
      expect(result).toBeFalse();
    });
    it("should return false for a map of invalid Players", () => {
      // Arrange
      const invalidMap = new Map<string, unknown>([
        ["bar", { player: "Bob", server: "Arizona" }],
        ["bar", { player: "Sally", server: "Baltimore" }],
        ["bar", { player: "Martha", server: "California" }]
      ]);

      // Act
      const result = DatabaseService.isPlayersMap(invalidMap);

      // Assert
      expect(result).toBeFalse();
    });
    it("should return true for a valid Player map", () => {
      // Arrange
      const validMap = new Map<string, Player>([
        [
          "foo",
          {
            name: "exac",
            server: "fairbanks",
            spec: "Priest",
            updated: "2020-08-08",
            gear: {
              head: [],
              neck: [],
              shoulder: [],
              chest: [],
              back: [],
              shirt: [],
              tabard: [],
              wrist: [],
              hands: [],
              waist: [],
              legs: [],
              feet: [],
              finger: [],
              trinket: [],
              mainHand: [],
              twoHand: [],
              ranged: []
            },
            wearing: {
              head: [],
              neck: [],
              shoulder: [],
              chest: [],
              back: [],
              shirt: [],
              tabard: [],
              wrist: [],
              hands: [],
              waist: [],
              legs: [],
              feet: [],
              finger: [],
              trinket: [],
              mainHand: [],
              twoHand: [],
              ranged: []
            },
          }
        ]
      ]);

      // Act
      const result = DatabaseService.isPlayersMap(validMap);

      // Assert
      expect(result).toBeTrue();
    });
  });
});