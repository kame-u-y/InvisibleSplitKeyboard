import sys
import numpy as np
from sklearn.model_selection import LeaveOneOut



def main():
    data = sys.stdin.readline()
    print(data)
    x = np.array([[1], [2], [3], [4]])
    loo = LeaveOneOut()
    loo.get_n_splits(x)
    for train_index, test_index in loo.split(x):
        print('TRAIN:', train_index, "TEST:", test_index)
        x_train, x_test = x[train_index], x[test_index]
        print(x_train, x_test)

if __name__ == '__main__':
    main()