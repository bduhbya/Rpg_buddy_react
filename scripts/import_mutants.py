import argparse

PL_TAG = "PL"


def process_args():
    parser = argparse.ArgumentParser(
        description="Import mutants character data from a file"
    )
    parser.add_argument(
        "-f", "--filename", type=str, required=True, help="File containing mutants"
    )
    args = parser.parse_args()
    return args


def process_file(filename):
    with open(filename, "r") as f:
        for line in f:
            print(line)
            if PL_TAG in line:
                parse_name_line(line)


def parse_name_line(line):
    data = line.split("•")
    pl_index = data[0].find(PL_TAG)
    name = line[:pl_index].strip()
    line = line[pl_index + len(PL_TAG) :]

    print("Name: ", name)


def main():
    args = process_args()
    print(args.filename)
    process_file(args.filename)


if __name__ == "__main__":
    main()
