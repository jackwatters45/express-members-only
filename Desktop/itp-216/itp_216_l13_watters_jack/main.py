import matplotlib.pyplot as plt
import pandas as pd

# # print(np.random.rand(10))
# pd_ser = pd.Series(np.random.rand(100), name='randoms')
# # print(pd_ser)
#
# df = pd.DataFrame({"Name": ["Patrick", "Gary", "Sandy"],
#                    "Age": (33, 24, 29),
#                    "Height (cm)": pd.Series([23, 45, 17])})
# print(df, '\n')
#
# print(df['Name'], '\n')
# print(df.iloc[1], '\n')

df = pd.read_csv("penguins.csv")
df = df.dropna()
# print("shape after drop:", df.shape)
# # print(df)
# # print(df.isnull)
#
# df["body_mass_g"] = df["body_mass_g"].div(1000)
# df = df.rename(columns={"body_mass_g": "body_mass_kg"})
# print(df.head())
#
# five_kg_plus = df[df["body_mass_kg"] > 5]
# print(five_kg_plus.head())

adelie = df[df["species"] == "Adelie"]
chinstrap = df[df["species"] == "Chinstrap"]
gentoo = df[df["species"] == "Gentoo"]

# ax.scatter(x=adelie["flipper_length_mm"], y=adelie["bill_length_mm"], color='blue', label='Adelie')
# ax.scatter(x=chinstrap["flipper_length_mm"], y=chinstrap["bill_length_mm"], color="#FF00FF", marker="D",
#            label='Chinstrap')
# ax.scatter(x=gentoo["flipper_length_mm"], y=gentoo["bill_length_mm"], color="green", marker="^", label='Gentoo')

fig, ax = plt.subplots(1, 1)

species_list = df["species"].unique()
df_grouped = df.groupby("species")
color_list = ["red", "yellow", "blue"]
counts = []

for species in species_list:
    df_group = df_grouped.get_group(species)
    vals = df_group['flipper_length_mm'].value_counts()
    counts.append(vals)


for index, species in enumerate(species_list):
    ax.hist(df_grouped.get_group(species)['flipper_length_mm'], color=color_list[index], alpha=0.4, bins=18,
            label=species)
ax.set(title='Penguin Flipper Lengths', xlabel='Flipper Length (mm)', ylabel='Frequency', )
ax.grid(which='major', color='#999999', alpha=.2)

ax.legend()
plt.tight_layout()
plt.show()
