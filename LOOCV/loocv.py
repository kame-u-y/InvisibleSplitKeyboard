import sys
import numpy as np
import json
import random
from sklearn.model_selection import LeaveOneOut
from statistics import mean, variance, stdev


class SpacialModel():
    def __init__(self):
        self.gaussian_data = {}

    def calc_gaussian(self, letter_data):
        x_arr = np.array([v["position"]["x"] for v in letter_data])
        y_arr = np.array([v["position"]["y"] for v in letter_data])

        x_ave = np.mean(x_arr)
        y_ave = np.mean(y_arr)
        x_sig = np.var(x_arr)
        y_sig = np.var(y_arr)
        rel = np.corrcoef(x_arr, y_arr)[0][1]

        return {
            'x': {
                'average': x_ave,
                'sigma': x_sig
            },
            'y': {
                'average': y_ave,
                'sigma': y_sig
            },
            'relation': rel
        }

    def create_spacial_model(self, tap_data):
        for k in tap_data.keys():
            self.gaussian_data[k] = self.calc_gaussian(tap_data[k])

    def get_spacial_model(self):
        print(self.gaussian_data)
        return self.gaussian_data

    def get_sm_probability(self, x, y):
        probabilities = []
        for l, v in self.gaussian_data.items():
            x_dict = v["x"]
            y_dict = v["y"]
            rel = v["relation"]
            z = (x - x_dict["average"]) ** 2 / x_dict["sigma"] ** 2 \
                - (2 * rel * (x - x_dict["average"]) * (y - y_dict["average"])) / (x_dict["sigma"] * y_dict["sigma"]) \
                + (y - y_dict["average"]) ** 2 / y_dict["sigma"] ** 2

            probabilities.append({
                "letter": l,
                "probability":
                    np.exp(-(z / (2 * (1 - rel ** 2)))) /
                    (2 * np.pi * x_dict["sigma"] *
                     y_dict["sigma"] * np.sqrt(1 - rel ** 2))
            })
        return sorted(probabilities, key=lambda x: x["probability"], reverse=True)


# def create_tap_set(tap_data, tap_set_list, word, tap_set, num):
#     if (num == len(word)):
#         tap_set_list.append(tap_set)
#         return

#     tap_set.append(random.choice(tap_data[word[num]]))
#     create_tap_set(tap_data, tap_set_list, word, tap_set, num+1)


def main():
    train_tap_data = json.load(open("./tapData/pangram-borderless.json", 'r'))
    test_tap_data = json.load(open("./tapData/borderless.json", 'r'))
    word_freq_data = json.load(open("./wordFreqData/wordFreq_top10000.json"))
    corpus = ["the"]

    # "stk-peripheral": json.load(open("./tapData/stk-peripheral.json", 'r')),
    # "stk-borderless": json.load(open("./tapData/stk-borderless.json", 'r')),

    spacial_model = SpacialModel()
    spacial_model.create_spacial_model(train_tap_data)

    for k, v in test_tap_data.items():
        for i, j in enumerate(v):
            test_tap_data[k][i]["letter"] = k
            test_tap_data[k][i]["sm_probability"] = spacial_model.get_sm_probability(
                j["position"]["x"], j["position"]["y"]
            )
            # a = sorted(test_tap_data[k][i]["sm_probability"], key=lambda x: x["probability"], reverse=True)
            # print(k, i, a)

    # ここより上に問題あり
    # print(json.dumps(test_tap_data, indent=2))

    for w in corpus:
        tap_set_list = []
        for _ in range(100):
            tap_set = []
            for i in range(len(w)):
                # print(w[i])
                tap_set.append(random.choice(test_tap_data[w[i]]))
            tap_set_list.append(tap_set)

        rank_list = []
        for tap_set in tap_set_list:
            letter_ps = []
            # print(tap_set)
            for i, v in enumerate(tap_set):
                new_letter_ps = []
                if i == 0:
                    for p in v["sm_probability"]:
                        letter_ps.append(
                            {"letter": p["letter"], "probability": p["probability"]})
                    continue
                else:
                    for p0 in letter_ps:
                        for p1 in v["sm_probability"]:
                            new_letter_ps.append({
                                "letter": p0["letter"] + p1["letter"],
                                "probability": p0["probability"] * p1["probability"]
                            })
                    letter_ps = sorted(
                        new_letter_ps, key=lambda x: x["probability"], reverse=True)[0:1000]

            known_lps = []
            unknown_lps = []

            for lp in letter_ps:
                l = lp["letter"]
                if l in word_freq_data[l[0]]:
                    known_lps.append({
                        "letter": lp["letter"],
                        "probability": lp["probability"] * float(word_freq_data[l[0]][l]["ratio"]) * 0.99
                    })
                else:
                    unknown_lps.append({
                        "letter": lp["letter"],
                        "probability": lp["probability"] * (1.0 / word_freq_data["total"]) * 0.01
                    })
            # print(known_lps)
            letter_ps = sorted(known_lps + unknown_lps,
                               key=lambda x: x["probability"], reverse=True)
            # print(json.dumps(letter_ps[0:100], indent=2))
            # print("hoge")
            for i, v in enumerate(letter_ps):
                # print(v["letter"])
                if v["letter"] == w:
                    print(i, v["letter"])
                    break
            print("end...")
            # break


if __name__ == '__main__':
    main()
