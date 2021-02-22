<template>
  <p :class="getBgTextClass()">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in massa a
    felis sollicitudin convallis nec non massa. Sed id dui ipsum. Nam luctus
    dictum erat, quis rutrum erat posuere sed. Suspendisse posuere, lacus sit
    amet porttitor tristique, elit massa scelerisque eros, at posuere augue orci
    vel diam. Sed vitae tempus augue. Cras in est at sem lobortis fringilla id
    id turpis. Etiam accumsan dui ipsum, nec euismod ipsum malesuada et. Cras
    augue felis, eleifend id massa id, semper iaculis eros. Orci varius natoque
    penatibus et magnis dis parturient montes, nascetur ridiculus mus. Interdum
    et malesuada fames ac ante ipsum primis in faucibus. Phasellus porttitor at
    lectus in porttitor. Donec placerat nisi id leo sodales consectetur.
    Phasellus sed velit quis turpis convallis fermentum. Phasellus id mauris et
    est congue pellentesque in et orci.
    <br />
    Phasellus ut consequat ex. Quisque malesuada sagittis massa porttitor
    consequat. Donec pharetra volutpat ornare. Maecenas tempus sodales risus.
    Cras euismod ultrices suscipit. Nulla facilisi. Morbi in porta lectus. Donec
    interdum scelerisque nisl, quis commodo urna tristique non. Curabitur
    maximus faucibus purus, vel pharetra nulla porttitor eget. Donec sit amet
    feugiat erat. Nam convallis ligula ut pretium ultrices. Phasellus aliquam
    posuere quam congue placerat. Nullam vestibulum suscipit blandit.
    <br />
    Donec luctus sollicitudin urna at placerat. Suspendisse at semper sapien.
    Suspendisse ac nunc sed massa interdum semper eget at tellus. Duis quam
    turpis, placerat nec erat vitae, mollis faucibus nunc. Morbi iaculis nulla
    et tempus mollis. In hac habitasse platea dictumst. Proin mollis eros a
    lorem ornare, ut malesuada mi porttitor. In tincidunt arcu a sem tincidunt,
    non facilisis erat lobortis. Fusce consequat, neque a finibus feugiat,
    ligula turpis pharetra justo, eu pellentesque justo massa vitae enim.
    Vivamus sit amet porttitor lacus. In in purus et augue lacinia pharetra.
    <br />
    Integer purus ipsum, condimentum id nunc ac, interdum tincidunt enim. Etiam
    non ex porttitor, varius lorem et, porttitor libero. Proin quis hendrerit
    nunc. Curabitur in maximus nibh. Mauris sed est imperdiet erat faucibus
    tincidunt. Phasellus eu vulputate elit, posuere volutpat felis. Etiam
    convallis, nisl a suscipit scelerisque, tortor purus cursus nunc, at luctus
    enim risus a lectus. Suspendisse interdum tortor id mauris sagittis feugiat.
    Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam eu
    semper lorem, non accumsan dolor. Aliquam eget gravida nisl.
    <br />
    Cras urna nibh, congue ut elit at, auctor tempor elit. Vivamus vitae magna
    urna. Vestibulum quis aliquet erat, et sodales mi. Quisque tristique, tortor
    in lacinia condimentum, felis elit ultrices enim, vitae molestie purus magna
    a mauris. Suspendisse potenti. Integer at velit nec neque interdum
    ultricies. Nullam maximus eleifend sem, sed ultrices odio auctor euismod.
    Nulla pellentesque, magna sed porta sagittis, diam elit efficitur ligula,
    laoreet dictum libero magna a massa. Cras imperdiet ex sed mi lobortis, at
    sollicitudin elit rhoncus. Integer eget lacus tincidunt, venenatis magna
    rhoncus, blandit dolor.
    <br />
    Vestibulum sodales lacus vitae enim dapibus, sed imperdiet eros posuere.
    Maecenas ac varius eros. Mauris in placerat turpis, vel egestas ex. Sed
    pulvinar enim ligula, vitae egestas leo imperdiet quis. Praesent id aliquet
    risus, in semper felis. Etiam eu purus elementum, facilisis sapien et,
    condimentum ipsum. Duis vel faucibus nunc, sed hendrerit orci. In placerat
    sem nec lobortis semper. Praesent elementum ligula hendrerit, vestibulum
    ligula id, pretium erat. Mauris velit purus, dictum vitae lacus at, sodales
    venenatis tellus. Pellentesque luctus aliquam molestie. Duis in magna sit
    amet massa porttitor laoreet nec eu metus. Duis a elit enim.
    <br />
    Sed in ligula at risus iaculis molestie vitae non dui. Maecenas euismod
    ipsum vitae odio consectetur, vitae aliquam elit condimentum. Aliquam id
    lorem vel purus semper feugiat. Fusce vulputate diam risus. Cras vel magna
    nisi. Curabitur mollis sapien libero, in accumsan ex cursus at. Donec justo
    lectus, egestas non eros et, blandit luctus tortor. Praesent metus eros,
    cursus sit amet erat et, facilisis ultrices ligula. Phasellus nisl enim,
    vulputate at erat eu, bibendum fringilla elit.
    <br />
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in massa a
    felis sollicitudin convallis nec non massa. Sed id dui ipsum. Nam luctus
    dictum erat, quis rutrum erat posuere sed. Suspendisse posuere, lacus sit
    amet porttitor tristique, elit massa scelerisque eros, at posuere augue orci
    vel diam. Sed vitae tempus augue. Cras in est at sem lobortis
  </p>
</template>

<script>
import { useStore } from '../stores/typingStore';
export default {
  name: 'BackgroundText',
  setup() {
    const { bgTextVisible } = useStore();
    const getBgTextClass = () => {
      return `bgtext-${bgTextVisible.value ? 'visible' : 'invisible'}`;
    };
    return { bgTextVisible, getBgTextClass };
  },
};
</script>

<style scoped>
.bgtext-visible {
  opacity: 1;
}
.bgtext-invisible {
  opacity: 0;
}
</style>
